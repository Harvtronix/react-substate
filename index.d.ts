import Substate from './dist/main'

declare module 'react-substate' {
    export default Substate
    export * from './dist/main'
}
