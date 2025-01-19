import { TfiFaceSad } from "react-icons/tfi";
import Button from "./Button";
import ButtonLink from "./ButtonLink";

type EmptyProps = {
  title: string;
  link?: string;
  href?: any;
  button?: string;
  onClick?: () => void;
};

const Empty = ({ title, link, href, button, onClick }: EmptyProps) => {
  return (
    <div className="flex flex-col flex-1 gap-5 items-center justify-center py-10">
      <TfiFaceSad size={90} className="text-black/80 dark:text-zinc-100" />
      <span className="font-bold text-2xl text-black/80 dark:text-zinc-100">
        {title}
      </span>
      <div className="flex flex-col sm:flex-row gap-3 ">
        {button && onClick && (
          <Button variant="secondary" onClick={onClick}>
            {button}
          </Button>
        )}
        {link && href && (
          <ButtonLink variant="secondary" to={href}>
            {link}
          </ButtonLink>
        )}
      </div>
    </div>
  );
};

export default Empty;
