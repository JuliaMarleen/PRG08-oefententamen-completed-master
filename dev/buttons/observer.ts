interface Observer { // we gebruiken een observer, zodat een class een notificatie krijgt wanneer een andere class iets doet, zodat hij daarop kan reageren.
    notifyUpdate() : void; //update
}