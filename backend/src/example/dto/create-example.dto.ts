import { ExampleTwoEntity } from "../entities/exampleTwo.entity";

export class CreateExampleDto {
    name:string;
    description:string;
    bound?:ExampleTwoEntity;
}
