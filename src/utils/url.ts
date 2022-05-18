import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { CleanObj } from ".";

export const useUrlParams = <K extends string>(keys: K[]) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return [
        useMemo(
            () => keys.reduce((prev, key) => {
                return { ...prev, [key]: searchParams.get(key) || '' }
            }, {} as { [key in K]: string }),
            //  eslint-disable-next-line react-hooks/exhaustive-deps
            [searchParams]
        ),
        (params: Partial<{ [key in K]: unknown }>) => {
            const o = CleanObj({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParams
            return setSearchParams(o)
        }
    ] as const

}