export default function getChatId(firstId: string, secondID: string): string {
    let combinedId = "";

    combinedId = firstId > secondID
    ? firstId + secondID
    : secondID + firstId

    return combinedId;


}