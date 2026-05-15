const { parse } = require('pg-connection-string');

console.log(parse("postgresql://postgres:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"));
console.log(parse("postgresql://postgres.project:password@aws-0-us-east-1.pooler.supabase.com:6543/postgres"));
console.log(parse("postgresql://postgres:[YOUR-PASSWORD]@db.project.supabase.co:5432/postgres"));
