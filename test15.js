const { parse } = require('pg-connection-string');

console.log(parse("postgresql://postgres:myPass@base@aws-0-us-east-1.pooler.supabase.com:6543/postgres"));
