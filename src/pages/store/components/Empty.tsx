interface EmptyProps {
  searchQuery: string;
}

export function Empty({ searchQuery }: EmptyProps): JSX.Element {
  return (
    <div className='flex flex-col gap-2 rounded-lg p-4 text-center'>
      <h2 className='text-3xl font-semibold sm:text-4xl'>
        No products found with{' '}
        <span className='font-bold text-accent'>{searchQuery}</span>
      </h2>
      <p className='text-base text-secondary sm:text-lg'>
        Please try a different search term or category.
      </p>
    </div>
  );
}
