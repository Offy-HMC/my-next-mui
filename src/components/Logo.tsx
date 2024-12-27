import Image from "next/image";

interface LogoProps {
  size: number;
  image: string;
}
export default function Logo({ size, image }: LogoProps) {
  return (
    <Image
      src={`/asset/images/${image}.png`}
      width={size}
      height={size}
      alt={`${image} Logo`}
      priority
      className="mb-4 rounded-2xl"
    />
  );
}
