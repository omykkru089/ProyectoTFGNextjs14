export default async function JuegoDetail({
    params,
}: {
    readonly params: Promise<{ juegolink: string}>
}) {
    const juegoLink = (await params).juegolink;
    return (
        <h1>Detalle sobre juego {juegoLink}</h1>
    )
}