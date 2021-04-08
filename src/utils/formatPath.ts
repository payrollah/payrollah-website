export default function formatPath(
  path: string,
  params: Record<string, string>
): string {
  const paramKeys = Object.keys(params);

  return paramKeys.reduce(
    (aggregatePath, paramKey) =>
      aggregatePath.replace(`:${paramKey}`, params[paramKey]),
    path
  );
}
