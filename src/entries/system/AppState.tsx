import { observable } from "mobx";
function initSystemState() {
    return observable({

    });
}
export const systemState = initSystemState();
export type SystemState = typeof systemState;
