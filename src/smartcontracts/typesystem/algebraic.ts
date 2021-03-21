import { guardValueIsSet } from "../../utils";
import { Type, TypeCardinality, TypedValue } from "./types";

/**
 * For simpler design, we chose not to subclass {@link VariadicType}, but create a different type instead for optionals,
 * even though an optional is conceptually variadic: it holds zero or one values.
 */
export class OptionalType extends Type {
    constructor(typeParameter: Type) {
        super("Optional", [typeParameter], TypeCardinality.variable(1));
    }
}

export class OptionalValue extends TypedValue {
    private readonly value: TypedValue | null;

    constructor(type: OptionalType, value: TypedValue | null = null) {
        super(type);

        // TODO: assert value is of type type.getFirstTypeParameter()

        this.value = value;
    }

    isSet(): boolean {
        return this.value ? true : false;
    }

    getTypedValue(): TypedValue {
        guardValueIsSet("value", this.value);
        return this.value!;
    }

    valueOf(): any {
        return this.value ? this.value.valueOf() : null;
    }

    equals(other: OptionalValue): boolean {
        return this.value?.equals(other.value) || false;
    }
}
