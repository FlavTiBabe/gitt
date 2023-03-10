import React from 'react';
import * as HoverCard from '@radix-ui/react-hover-card';
import type { SearchResults } from '~/hooks/useGithubAPI';
import {Star, Eye, Book, GitFork} from "lucide-react"
import {motion} from "framer-motion"

interface HoverCardProps extends SearchResults {
  i: number
}

const HoverCardDemo = (profile:HoverCardProps) => (
  <HoverCard.Root>
    <HoverCard.Trigger asChild>
      <a
        className="cursor-pointer"
        href={profile.owner.htmlUrl}
        target="_blank"
        rel="noreferrer noopener"
      >
        <motion.div   
        initial={{
        opacity: 0,
      }}
      whileHover={{ scale: 1.1, cursor: "pointer" }}
      animate={{ opacity: 1, translateX: 0, translateY: 0 }}
      transition={{ duration: 0.3, delay: profile.i * 0.1 }}
      className='flex h-[200px] flex-col border-2 bg-slate-800  relative rounded-md p-4  hover:bg-slate-500 hover:shadow-md transition-all'>
          <div className='flex items-center gap-3'>
            <Book width="15px" className='fill-blue-400'></Book> 
            <span className='text-blue-400 font-bold'>{profile.name}</span> 
            <span className='text-gray-500'>Public</span>
          </div>
          <p className='text-slate-200 mt-2 text-ellipsis overflow-hidden'>{profile.description}</p> 
          <div className='flex relative items-center mt-2'>
            { profile.language &&
            <div className='bg-gray-200 rounded-md px-2 py-1 text-gray-600 text-sm'>{profile.language}</div> 
            }
            <Star width="15px" className='fill-yellow-400 ml-2'/> 
            <div className='text-gray-600 ml-1'>{profile.stargazersCount}</div> 
            <GitFork width="15px" className='fill-gray-400 ml-2'/> 
            <div className='text-gray-600 ml-1'>{profile.forksCount}</div>
          </div>
        </motion.div>
      </a>
    </HoverCard.Trigger>
    <HoverCard.Portal>
      <HoverCard.Content
        className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-white p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
        sideOffset={5}
      >
        <div className="flex flex-col gap-[15px]">
          <img
            className="block h-[60px] w-[60px] rounded-full object-cover"
            src={profile.owner.avatarUrl}
            alt="Radix UI"
          />
          <div className="flex flex-col gap-[10px]">
            <div>
              <div className="text-mauve12 m-0 text-[20px] font-bold leading-[1.5]">{profile.name}</div>
              <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">@{profile.owner.login}</div>
            </div>
            <div className="text-mauve12 m-0 text-[15px] leading-[1.5]">
              {profile.description}
            </div>
            <div className="flex gap-[15px]">
              <div className="flex gap-[5px] items-center">
                <div className="text-mauve12 m-0 text-[20px] font-bold leading-[1.5]">{profile.stargazersCount}</div>{' '}
                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]"><Star width="20px" className='fill-yellow-400'></Star></div>
              </div>
              <div className="flex gap-[5px]">
                <div className="text-mauve12 m-0 text-[20px] font-bold leading-[1.5]">{profile.watchersCount}</div>{' '}
                <div className="text-mauve10 m-0 text-[15px] leading-[1.5]"><Eye width="20px"></Eye></div>
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