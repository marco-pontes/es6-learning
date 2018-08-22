class ProxyFactory {
    static create(objeto, props, acao) {
        return new Proxy(objeto, {
            get(target, prop, receiver) {

                if(props.includes(prop) && ProxyFactory.isFunction(target[prop])) {
                    return function () {
                        console.log(`Interceptando get function: ${prop}`);
                        let result = Reflect.apply(target[prop], target, arguments);
                        acao(target);
                        return result;
                    }
                }
                console.log(`Interceptando get: ${prop}`);
                return Reflect.get(target, prop, receiver);
            },
            set(target, prop, value, receiver) {
                console.log(`Interceptando set: ${prop}`);
                let result = Reflect.set(target, prop, value, receiver);
                if(props.includes(prop)) {
                    acao(target);
                }
                return result;
            }
        });
    }

    static isFunction(func) {
        return typeof(func) == typeof(Function);
    }
}

export default ProxyFactory;