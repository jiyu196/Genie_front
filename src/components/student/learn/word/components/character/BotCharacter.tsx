type Expression = "smile" | "excited" | "ready";

const characterMap: Record<Expression, string> = {
    smile: "/images/bot-smile.svg",
    excited: "/images/bot-excited.svg",
    ready: "/images/bot-ready.svg",
};

export default function BotCharacter({
                                         expression,
                                     }: {
    expression: Expression;
}) {
    return (
        <img
            src={characterMap[expression]}
            alt="지니"
            className="w-32 h-32 select-none"
            draggable={false}
        />
    );
}
