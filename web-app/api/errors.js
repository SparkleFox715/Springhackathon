
export function tryAndCatch(tryFunc) {
    try {
        tryFunc();
    } catch (error) {
        console.error(error);
        response.status(500).send(error);
    }
}
