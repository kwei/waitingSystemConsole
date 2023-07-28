"use client"

import {useCallback, useEffect, useState} from "react";
import {ControlType} from "@/app/api/account/route";
import {queryControl} from "@/app/api/control/queryControl";
import {updateControl} from "@/app/api/control/updateControl";

export function ToolBox() {
    const [config, setConfig] = useState<ControlType | null>(null)

    const fetchControlConfig = useCallback(async () => {
        return queryControl({ }).then(res => {
            if (res) return res[0]
            return null
        }).catch(e => {
            console.log(e)
            return null
        })
    }, [])

    useEffect(() => {
        fetchControlConfig().then(data => {
            if (data) setConfig(data)
        })
    }, [fetchControlConfig])

    const handleSwitchStatus = useCallback(() => {
        if (config) {
            updateControl(config, {
                ...config,
                acceptWaiting: !config.acceptWaiting
            }).then(res => {
                if (res) {
                    fetchControlConfig().then(data => {
                        if (data) setConfig(data)
                    })
                }
            })
        }
    }, [config, fetchControlConfig])

    return (
        <div className='flex flex-row-reverse items-center w-full gap-5 p-4'>
            {!config
                ? <span className='px-4 py-1 rounded-2.5 border border-solid border-gray-300'>獲取狀態中...</span>
                : <button className='px-4 py-2 rounded-2.5 bg-blue-500 text-gray-100 hover:bg-blue-300 hover:text-gray-900' onClick={handleSwitchStatus}>{config.acceptWaiting ? '關閉候位' : '開啟候位'}</button>
            }
        </div>
    )
}