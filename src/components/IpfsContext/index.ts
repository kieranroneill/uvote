import IPFS from 'ipfs';
import * as React from 'react';

export interface IpfsContext {
    ipfs: IPFS | null;
}

const IpfsContext: React.Context<IpfsContext> = React.createContext<IpfsContext>({
    ipfs: null,
});

export const IpfsConsumer: React.Consumer<IpfsContext> = IpfsContext.Consumer;
export const IpfsProvider: React.Provider<IpfsContext> = IpfsContext.Provider;
