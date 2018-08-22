import ProxyFactory from '../services/proxy-factory';
class Bind {

    constructor(model, view, ...props) {
        let proxy = ProxyFactory.create(model, props, model => view.update(model));
        view.update(model);
        return proxy;
    }
}

export default Bind;