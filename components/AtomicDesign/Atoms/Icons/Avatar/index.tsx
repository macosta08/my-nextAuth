import React from 'react';
import Image from 'next/image';

// Component props typing// Define prop types for the Avatar component
interface AvatarProps {
  src?: string;
  alt: string;
  extraClassName?: string;
}

const Avatar = ({ src, alt, extraClassName }: AvatarProps) => {
  const initials = alt ? alt.substring(0, 2) : 'AV';

  return (
    <div className={`avatar ${extraClassName}`}>
      {/** Image renderings (avatar) */}
      {src ? (
        <Image
          src={src}
          alt='Avatar'
          fill
          quality={100}
          style={{ objectFit: 'cover' }}
        />
      ) : (
        // Generate an avatar with text
        <div className='avatar__src-empty'>
          <p className='avatar__text'>{initials}</p>
        </div>
      )}
    </div>
  );
};

export { Avatar };
