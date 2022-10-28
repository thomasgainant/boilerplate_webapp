import { Observable } from "rxjs";
import { Store } from "./store";

/**
 * Action/reducer/query class for state management
 *
 * A query is the interface between the UI and the store. It will be used by directives (bzw. components) to get the current stored state through a subscription system based on rxjs. It is possible for those directives to get the subscription to a property of the state from the Query and get a new value everytime this property has been altered. This new value is dispatched to every directives or components subscribing to this property, ensuring that they all have the same value at the same time.
 *
 * A query extending from this class should supply a list of observables which can be then subscribed to, inside directives and components.
 *
 * This Query class works with the dependency injection system from Angular and be used as a singleton injected in a whole module using the "providedIn: 'root'" decorator. A Query can also work work as a distinct instance using the "providedIn: 'any'" decorator.
 *
 * Remember that this class was thought to work as a pair Store/Query, which means there should be only one dedicated Query for one dedicated Store.
 */
export class Query<S>{
  private store:Store<S>;

  /**
   * @param store The store to which this Query is associated with and which all subscriptions to a property of a state will reflect
   */
  constructor(store:Store<S>){
    this.store = store;
  }

  /**
   * Provides an observable to subscribe to, associated to a property of the state, and which will give the new value of this property shared in the whole application everytime this property has been altered.
   *
   * **This method should only be used in the constructor of a Query, when we are initializing the different subscriptions this Query gives.**
   * @param index The property of the state to get the subscription to
   * @returns An observable which will send the new value of a property in the state, everytime it is updated
   */
  public select<K extends keyof S>(index:K):Observable<S[K]>{
    return this.store.get(index);
  }
}
