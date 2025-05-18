const {execSync}=require('child_process')
const tests=[
    {args:'',exp:''},
    {args:'ABCDEFZ WBCDXYZ',exp:'BCD'},
    {args:'132 12332 12312',exp:'1'},
    {args:'ABCDEFGH ABCDEFG ABCEDF ABCED',exp:'ABC'},
    {args:'ABCDEFGH ABCDEFG ABCDEF ABCDE',exp:'ABCDE'},
    {args:'ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBA',exp:'A'},
    {args:'ABCDEFGH ABCDEFG ABCDEF ABCDE EDCBCA',exp:'BC'},
    {args:'ABCDEFGH ABCDEFG AxBCDEF ABCDxE EDCBCAABCD',exp:'BCD'},
    {args:'ABCDEFGH 1234',exp:''},
    {args:'ABCDEFGH',exp:'ABCDEFGH'},
    {args:'ABCQEFDEFGHIJ BCXEFGYZBCDEWEFGHU',exp:'EFGH'}
]

tests.forEach(({args,exp},i)=>{
    const out=execSync(`node lcs.js ${args}`).toString().trim()
    console.log(`Test ${i+1}:`,out===exp?'PASS':'FAIL',`| Expected: "${exp}" | Got: "${out}"`)
})
