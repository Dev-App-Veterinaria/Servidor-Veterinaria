export type Disease = {
    _id?: string;
    name: string;
    scientificName: string;
    etiologicalAgent: string;
    vector: [string];
    lifeCycle: string;
    transmission: string;
    clinicalManifestation: string;
    complications: string;
    distribution: string;
    states: [string];
}
