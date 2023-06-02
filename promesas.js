const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators')

const doSomething = () => {
    //una promesa tiene dos estados, resolve y reject
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('valor 3');
        }, 3000);
    });
    //ejecuta lo que tiene que ejecutar y ya. Y solo se envia un dato.
}

const doSomething$ = () => {
    //los observales llevan el signo $
    return new Observable(observer => {
        observer.next('valor 1 $');
        observer.next('valor 2 $');
        observer.next('valor 3 $');
        observer.next(null);
        setTimeout(() => {
            observer.next('valor 4 $');
        }, 5000);
        setTimeout(() => {
            observer.next(null);
        }, 8000);
        setTimeout(() => {
            observer.next('valor 5 $');
        }, 10000);
    })
    //observable permite hacer más de una operación
    //y es una entrega CONSTANTE de datos, una promesa por otro lado, No.
}

(async() => {
    const rta = await doSomething();
    console.table(rta); 
})();

(async() => {
    const obs$ = doSomething$();
    obs$
    .pipe(
        filter(value => value !== null)
    )
    .subscribe(rta => {
        console.log(rta);
    });
})();