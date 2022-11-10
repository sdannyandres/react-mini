import {useEffect, useState} from 'react'
import{ethers} from 'ethers'
const {ethereun} = window

export function Balance() {
    const [cuenta, setCuenta] =useState(null)
    const [balance, setBalance] = useState(null)
    const [error, setError] = useState(null)
    useEffect((e) => {
        ethereun && ethereum.request({method:'eth_requestAccounts'}).then(cuenta => {
            setCuenta(cuenta[0])
            ethereun.on('accountsChanged',(i) => {
                setCuenta(i[0])
            })
        })
    },[])
    useEffect(() => {
        if (cuenta){
            const provider = new ethers.providers.web3Provider(Ethereum)
            provider.getBalance(cuenta).then(balance => {
                console.log(ethers.utils.formatEther(balance))
                setBalance(ethers.utils.formatEther(balance))
            
            })
        }
    },[cuenta])
    

    if (!ethereum) (
        <di>
            <p>
                {
                    cuenta ? cuenta : 'Cargando...'
                }
            </p>
            <p>
                    balance ? balance : 'Cargando balance...'
            </p>
        </di>
    )
      
}