
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const EvmChains = window.evmChains;
let provider;

function init() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider,
            options: {
                infuraId: "52de0e1587c746f7bbd10b8c13ebd6e0",
                qrcodeModalOptions: {
                    mobileLinks: [
                        "rainbow",
                        "metamask",
                        "argent",
                        "trust",
                        "imtoken",
                        "pillar",
                    ],
                },
            }
        },
    };

    web3Modal = new Web3Modal({
        cacheProvider: true, // optional
        providerOptions, // required
        disableInjectedProvider: false
    });
    console.log(web3Modal);
}

async function onConnect() {
    try {
        provider = await web3Modal.connect();
        console.log(provider);
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    }

    provider.on("accountsChanged", (account) => {
        console.log(account);
    });

    provider.on("chainChanged", (chainId) => {
        console.log("chainId " + chainId);
    });

    provider.on("networkChanged", (networkId) => {
        console.log("networkId " + networkId);
    });

}

async function addToken() {
    const symbol = 'BALLERS';
    const decimal = 18;
    const image = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVxFKei3JnIBp5_i-hMhgiJrCc6_g2lFczc55LWY3HEZHCgxJilfJxlRZJxEPjlrZXbzU&usqp=CAU';

    const token = await provider.request({
        method: "wallet_watchAsset",
        params: {
            type: "ERC20",
            options: {
                address: "0x22ef56e809f2bc34b50eb7044a3dd82ad1a5669d",
                symbol: symbol,
                decimals: decimal,
                image: image
            },
        },
    }).then(function (res) {
        console.log(res)
    }).catch(function (e) {
        console.log(e)
    });
}
