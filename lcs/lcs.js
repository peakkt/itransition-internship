[,,...a]=process.argv
for(l=n=a[0]?.length;l;l--)for(i=0;i<=n-l;i++)a.every(x=>x.match(t=a[0].substr(i,l)))&&(l=console.log(t))