# Supabase
This is the supabase project and config for Mixie, this is shared across all the apps and packages.

### Credits
- [Midday](https://github.com/midday) - For reference on how to separate supabase config into a seperate package. [Link To Code](https://github.com/midday-ai/midday/tree/e1e72c9b8a7e8f42f010d404057f78c32554a698/packages/supabase)
- [Supabase](https://github.com/supabase/supabase) - For the supabase config and the supabase cli.


## How this was setup 
First for those wondering you might have a few questions about this setup:
- Why is folder named `supabase` with sub folder of `supabase`?
- Why seperate the supabase config into a seperate package?

1. The folder with sub folder of supabase is to pull in the environment variables for the supabase config so you can then run it locally.
2. The supabase config is seperated into a seperate package so that we can use it in other packages and apps. e.g mobile, web, docs, etc.
