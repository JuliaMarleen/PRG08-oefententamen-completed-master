interface Subject {
    subscribe(observer : Observer) : void;
    unSubscribe(observer : Observer) : void; 
    // notify() : void;  ... bij button heet het handleCLick, dus kan nu niet voor overal, maar dat is het eigenlijk wel.
}