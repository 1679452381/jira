import { useEffect } from "react";
import { Project } from "../../type/projcet";
import { CleanObj } from "../../utils";
import { useHttp } from "../../utils/http";
import { useAsync } from "../../utils/use-async";

export const useProjects = (param: Partial<Project>) => {

    const client = useHttp()

    const { run, ...result } = useAsync<Project[]>()

    useEffect(() => {
        run(client('projects', { data: CleanObj(param) }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);
    return {
        ...result
    }
}