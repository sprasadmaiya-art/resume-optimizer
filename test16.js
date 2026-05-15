function fixConnectionString(url) {
  if (!url || !url.startsWith("postgre")) return url;
  
  try {
    const protocolSplit = url.indexOf("://");
    if (protocolSplit === -1) return url;
    
    const protocol = url.substring(0, protocolSplit + 3);
    const rest = url.substring(protocolSplit + 3);
    
    const lastAtIdx = rest.lastIndexOf("@");
    if (lastAtIdx === -1) return url;
    
    const credentials = rest.substring(0, lastAtIdx);
    const hostPart = rest.substring(lastAtIdx + 1);
    
    const colonIdx = credentials.indexOf(":");
    if (colonIdx === -1) return url;
    
    const user = credentials.substring(0, colonIdx);
    const password = credentials.substring(colonIdx + 1);
    
    // If password already has %40, it's already encoded. 
    // But encodeURIComponent encodes everything correctly.
    // Wait, decode first to prevent double encoding?
    let decodedPassword = password;
    try { decodedPassword = decodeURIComponent(password); } catch(e) {}
    
    const encodedPassword = encodeURIComponent(decodedPassword);
    
    return `${protocol}${user}:${encodedPassword}@${hostPart}`;
  } catch (e) {
    return url;
  }
}

console.log(fixConnectionString("postgresql://postgres:myPass@base@aws-0-us-east-1.pooler.supabase.com:6543/postgres"));
console.log(fixConnectionString("postgresql://postgres:my#Pass@aws-0-us-east-1.pooler.supabase.com:6543/postgres"));
console.log(fixConnectionString("postgresql://postgres.project:my%Pass@aws-0-us-east-1.pooler.supabase.com:6543/postgres"));
