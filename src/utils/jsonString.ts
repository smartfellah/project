export const jsonString = (dbObject: any) =>
  JSON.stringify(dbObject, (key, value) => {
    return typeof value === "bigint" ? value.toString() : value; // Convert BigInt to string
  });
