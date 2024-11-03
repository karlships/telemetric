import Image from "next/image";

interface GridItemProps {
  imageSrc: string;
  heading: string;
  body: string;
}

export default function GridItem({ imageSrc, heading, body }: GridItemProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-[var(--element)] p-6 rounded-lg">
        <Image src={imageSrc} alt={heading} width={1000} height={500} />
      </div>
      <h3 className="text-xl font-semibold">{heading}</h3>
      <p className="text-center text-[var(--subtitle)]">{body}</p>
    </div>
  );
}
