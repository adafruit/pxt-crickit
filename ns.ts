
/**
 * CRICKIT board support
 */
//% weight=90 color="#03AA74" icon="\uf111"
//% groups='["Motors", "Signals"]'
namespace crickit {
    let _dev: seesaw.Seesaw;
    export function saw(): seesaw.Seesaw {
        if (!_dev)
            _dev = new seesaw.Seesaw();
        return _dev;
    }
}