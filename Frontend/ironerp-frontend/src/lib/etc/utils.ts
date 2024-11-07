export enum Intent {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger',
    DEFAULT = 'default',
}

export function classList(classLs: string[]): string {
    let classes: string = "";
    
    classLs.map(cls => classes += ` ${cls}`);
    
    return classes;
}