import { ITrace } from '../Models/trace.model';

interface ICreateTrace {
    ip: ITrace['ip'];   
}

async function CreateTrace({
    ip
  }: ICreateTrace): Promise<ITrace> {
    
    let myPromise: Promise<ITrace> = Promise.resolve({ip: "123"});
    return myPromise
}

export default {
    CreateTrace
};