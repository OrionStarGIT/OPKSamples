import React from "react";
import { BaseComponent, BaseComponentProps } from "orionos-eve-core";
import { TaskPendingViewModel } from "./TaskPendingViewModel";
import { TaskPendingScreen } from "./TaskPendingScreen";

export class TaskPendingProvider extends BaseComponent<BaseComponentProps, TaskPendingViewModel, any>{

    public constructor(props: BaseComponentProps) {
        super(props);

        this.setViewModel(new TaskPendingViewModel());
    }

    public render(): React.ReactNode {
        return (
            <TaskPendingScreen viewModel={this.viewModel as TaskPendingViewModel}/>
        );
    }

}