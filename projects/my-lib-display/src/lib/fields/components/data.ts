export interface DataSelect{
    key: string;
    value:string,
    desc: string;
  }
  
  
  export function createData():DataSelect[]{
    return [
      {key: '1', value: '11', desc:'desc data 11' },
      {key: '1', value: '12', desc:'desc data 12' },
      {key: '1', value: '13', desc:'desc data 13' },
      {key: '2', value: '21', desc:'desc data 21' },
      {key: '2', value: '22', desc:'desc data 22' },
      {key: '2', value: '23', desc:'desc data 23' },
      {key: '3', value: '31', desc:'desc data 31' },
      {key: '3', value: '32', desc:'desc data 32' },
      {key: '3', value: '33', desc:'desc data 33' },
      
    ];
  }