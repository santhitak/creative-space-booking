interface Props {
  children: React.ReactNode;
}

const GridLayout = (props: Props) => {
  return (
    <div className="w-full grid grid-cols-12">
      <div className="col-start-2 col-end-12">{props.children}</div>
    </div>
  );
};

export default GridLayout;
