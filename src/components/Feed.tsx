type Props = {
  author?: string;
  title?: string;
  description: string;
  publishedAt?: string;
  photo?: string;
};

function Feed({
  author = "Unknown",
  title,
  description,
  publishedAt,
  photo,
}: Props) {
  return (
    <div className="p-6 rounded bg-zinc-100">
      <div className="flex flex-col gap-2 justify-between h-full">
        <div className="space-y-2">
          {photo && (
            <div>
              <img src={photo} alt={title} className="object-cover h-36" />
            </div>
          )}
          <div>
            <h4 className="font-medium">{title}</h4>
            <div className="text-sm">{description}</div>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-bold">{author}</h2>
          <span className="text-xs">{publishedAt}</span>
        </div>
      </div>
    </div>
  );
}

export default Feed;
