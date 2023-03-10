import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import type { SearchResults } from '~/hooks/useGithubAPI';
import {Star, Eye, Book, GitFork} from "lucide-react"

const HoverCardDemo = (profile:SearchResults) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className=" cursor-pointer "
        href={profile.owner.htmlUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className='flex flex-col border-4 rounded-md'>
            <div className='flex gap-3'><Book width="15px"></Book> <span className='text-blue-400'>{profile.name}</span> Public</div>
            <div>{profile.description}</div> 
            <div className='flex gap-3'>{profile.language} <Star width="45px"/> {profile.stargazersCount} <GitFork width="45px"/> {profile.forksCount}</div>
        </div>
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        sideOffset={5}
      >
        <div className="flex flex-col gap-[7px]">
          <img
            className="block h-[60px] w-[60px] rounded-full"
            src={profile.owner.avatarUrl}
            alt="Radix UI"
          />
          <div className="flex flex-col gap-[15px]">
            <div>
              <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">{profile.name}</div>
              <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">@{profile.owner.login}</div>
            </div>
            <div className="text-mauve12 m-0 text-[15px] leading-[1.5]">
              {profile.description}
            </div>
            <div className="flex gap-[15px]">
              <div className="flex gap-[5px]">
                <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">{profile.stargazersCount}</div>{' '}
                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]"><Star width="15px"></Star></div>
              </div>
              <div className="flex gap-[5px]">
                <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">{profile.watchersCount}</div>{' '}
                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]"><Eye width="15px"></Eye></div>
              </div>
            </div>
          </div>
        </div>

        <HoverCard.Arrow className="fill-white" />
      </HoverCard.Content>
    </HoverCard.Portal>
  </HoverCard.Root>
);

export default HoverCardDemo;