import Dinero from 'dinero.js/build/esm/dinero.min'

export default (amount) => {
    return Dinero({ amount, currency: 'EUR' }).toFormat('$0,0.00')
}
