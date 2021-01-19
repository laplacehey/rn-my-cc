export default class H {
    static get isDebug() {
        return process.env.NODE_ENV !== 'production'
    }
    static error(msg) {
        let e = new Error(msg)
        if (H.isDebug) {
            throw e
        } else {
            return e
        }
    }
}
