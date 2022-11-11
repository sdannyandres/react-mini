import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
const { ethereun } = window
import { useForm } from 'react-hook-form'

export function Balance() {
    const { register, handleSubmit } = useForm();
    const [cuenta, setCuenta] = useState(null)
    const [balance, setBalance] = useState(null)
    const [resultado, setResultado] = useState(null)
    const [ok, setOk] = useState(null)
    const [ko, setKo] = useState(null)
    useEffect((e) => {
        ethereun && ethereum.request({ method: 'eth_requestAccounts' }).then(cuenta => {
            setCuenta(cuenta[0])
            ethereun.on('accountsChanged', (i) => {
                setCuenta(i[0])
            })
        })
    }, [])
    useEffect(() => {
        if (cuenta) {
            const provider = new ethers.providers.web3Provider(Ethereum)
            provider.getBalance(cuenta).then(balance => {
                console.log(ethers.utils.formatEther(balance))
                setBalance(ethers.utils.formatEther(balance))

            })
        }
    }, [cuenta])
    async function submit(data) {
        const parametros = {
            from: cuenta,
            to: data.address,
            value: ethers.utils.parseEther(data.amount).toHexString()
        }
        try {
            const txHash = await ethereum.request
            ({method: 'eth_sendTransaction', 
            params:[parametros]
        })
           setOk(txHash)
        }catch (error) {
            setKo(error)
    
            }
        


    }

        if (!ethereum) {
            return <div> No hay metamask</div>
        }
        return (
            <div>
                <p>
                    Cuenta:
                    {
                        cuenta ? cuenta : 'Cargando...'
                    }
                </p>
                <p>
                    Saldo:
                    {
                        balance ? balance : 'Cargando balance...'
                    }
                </p>
                <form className="form-inline" onSubmit={handleSubmit(submit)}>
                    <div className="form-group mb-3">
                        <label htmlFor="address">Address</label>
                        <input defaultValue="0x5Bd97591C4370cb5317146Bbc5D4B5C918384981" id="address" className="form-control" {...register("address")} />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="amount">Amount</label>
                        <input defaultValue={0.0012} id="amount" className="form-control" {...register("amount")} />
                    </div>
                    <button type="submit" className="btn btn-primary mb-3">Send</button>
                </form>
                {ok && <div className="alert alert-info m-3">{ok}</div>}
                {ko && <div className="alert alert-danger m-3">{ko}</div>}
            </div>
        )

    }