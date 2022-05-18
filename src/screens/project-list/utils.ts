import { useMemo } from "react"
import { useUrlParams } from "../../utils/url"

export const useProjectSearchParams = () => {
    const [param, setParam] = useUrlParams(['name', 'personId'])
    return [
        useMemo(() => ({ ...param, personId: Number(param.personId) || undefined }), [param]),
        setParam
    ] as const
}