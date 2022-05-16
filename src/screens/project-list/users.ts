import { useEffect } from "react"
import { User } from "../../type/user"
import { CleanObj } from "../../utils"
import { useHttp } from "../../utils/http"
import { useAsync } from "../../utils/use-async"

export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()

    const { run, ...result } = useAsync<User[]>()

    useEffect(() => {
        run(client('users', { data: CleanObj(param || {}) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param])
    return {
        ...result
    }
}