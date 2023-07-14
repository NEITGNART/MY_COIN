import './style.scss';

export const Footer = (props) => {
    return (<div className="footer">
        <div className='footer__notes row'>
            <div>
                <p>Pricing taken from </p><span>Coingecko</span>
            </div>
            <p>© 2023 MyEtherWallet. All Rights reserved.</p>
        </div>
    </div>);
};

const discoverArray = ['Covert Units', 'MEW wallet', 'MEWconnect Protocol', 'MEW CX', 'EthVM', 'Buy a Hardware wallet', 'send Offline Helper', 'Verify Message', 'Submit Dapp', 'Press Kit', 'Generate Eth2 Address'];

const affiliatesArray = ['Ledger Wallet', 'Ether Card', 'AIchemy', 'Bity', 'Billfodl', 'Finney', 'Trezor', 'Secalot', 'KeepKey', 'CoolWallet', 'State of the Dapps', 'BC Vault'];

const mewArray = ['About', 'Team', 'FAQs', 'MEWtopia', 'Customer Support', 'Help Center'];

const contents = [{
    title: 'Discover', data: discoverArray
}, {
    title: 'Affiliates', data: affiliatesArray
}, {
    title: 'MEW', data: mewArray
}];
