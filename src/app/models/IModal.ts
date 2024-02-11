import { Type } from '@angular/core';

export interface IModal {
    header?: string;
    content?: string;
    cancelText?: string;
    confirmText?: string;
    okText?: string;
    component?: Type<never>;
    hasButtons?: boolean;
}
