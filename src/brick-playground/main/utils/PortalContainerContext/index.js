import * as React from 'react'

const ctx = React.createContext()

const PortalContainerProvider = ctx.Provider
const PortalContainerConsumer = ctx.Consumer

export {
    PortalContainerProvider,
    PortalContainerConsumer
}
