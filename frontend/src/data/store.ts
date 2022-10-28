import { BehaviorSubject, Observable } from "rxjs";

/**
  Store class for state management

  A store is like an in-memory database storing a state of an application or the state of a part of the application. A state is a set of properties having values which can be shared accross the application independently from its architecture (component hierarchy, separated modules, etc.). A store makes sure these values are immutable, shared and accessible.

  This Store class works with the dependency injection system from Angular and be used as a singleton injected in a whole module using the "providedIn: 'root'" decorator. A Store can also work work as a distinct instance using the "providedIn: 'any'" decorator.

  The interaction with a Store has to be made through a dedicated Query object, the second class used for this state management system.
*/
export class Store<S>{
  private state:S;

  private subjects:{
    [index:string]: BehaviorSubject<any>;
  } = {};

  /**
   * @param initial A store should receive its full initial state.
   */
  constructor(initial:S){
    this.state = initial;

    for(let index in initial){
      let entry = new BehaviorSubject(initial[index]);
      this.subjects[index] = entry;
    }
  }

  /**
   * Returns a subscription to a property of the state. Everytime the value of this property is modified somewhere in the app from the action in a component and through an intermediate service or Query, this subscription will return the new value to the Query dedicated to this store (which will then communicate it to all components using the subscriptions of this Query).
   *
   * **This method is used in the parent class of every Queries and should not be called outside of this context.**
   * @param index The property of the state to generate a subscription to.
   * @returns An Observable which will dispatch a new value everytime the property of the state has been altered.
   */
  public get<K extends keyof S>(index:K):Observable<S[K]>{
    let subject = this.subjects[index as string];
    if(subject)
      return subject.asObservable();
    return subject;
  }

  /**
   * Returns directly the current values inside the stored state.
   *
   * **The values sent can not be confirmed as current after the call of this method. After this call, the values could be changed from anywhere in the app at anytime (including in the past!).**
   *
   * **This method should be called as much as possible from intermediate services and Queries and never directly from components.**
   * @returns The current values of every properties inside the stored state
   */
  public getValues(){
    return this.state;
  }

  /**
   * Updates the stored state by replacing the met properties of the state with new values. These values are then communicated to the dedicated Query through the subscription it has.
   *
   * **This method should be called as much as possible from intermediate services and Queries and never directly from components.**
   * @param newValues State or part of the state which has to be altered. It is a list of properties and their new values which will be  updated in the stored state.
   */
  public update(newValues:Partial<S>){
    for(let index in newValues){
      if(this.subjects[index]){
        let newContent:any = newValues[index];
        this.subjects[index].next(newContent);
        this.state[index] = newContent;
      }
    }
  }
}
