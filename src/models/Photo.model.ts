export interface IPhoto{
id?: number;
farm?: number | null;
isfamily?: number | null;
isfriend?: number | null;
ispublic?: number | null;
owner?: string | null;
secret?: string | null;
server?: string | null;
title?: string | null;
}
export class Photo implements IPhoto{
    constructor(
        id?: number,
        farm?: number | null,
        isfamily?: number | null,
        isfriend?: number | null,
        ispublic?: number | null,
        owner?: string | null,
        secret?: string | null,
        server?: string | null,
        title?: string | null
    ){}
}