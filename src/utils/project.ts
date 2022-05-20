import { useEffect } from "react";
import { Project } from "../type/projcet";
import { CleanObj } from ".";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useProjects = (param: Partial<Project>) => {

    const client = useHttp()

    const { run, ...result } = useAsync<Project[]>()
    let fetchProjects = () => client('projects', { data: CleanObj(param) })
    useEffect(() => {
        run(fetchProjects(), { retry: fetchProjects })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);
    return {
        ...result
    }
}

export const useEditProject = () => {
    const { run } = useAsync()
    const client = useHttp()
    const mutate = (project: Partial<Project>) => {
        return run(client(`projects/${project.id}`, {
            data: project,
            method: "PUT"
        }))
    }

    return { mutate }

}

export const useAddProject = () => {
    const { run } = useAsync()
    const client = useHttp()
    const mutate = (project: Partial<Project>) => {
        return run(client(`projects`, {
            data: project,
            method: "POST"
        }))
    }

    return { mutate }

}