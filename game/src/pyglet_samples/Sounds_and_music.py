'''This is currently only an example and will not run.'''

import pyglet

# get a file to play as music while pyglet runs.
# this is only appropriate for something that will play continuously.
music = pyglet.resource.media('')
# start the music.
music.play()

# for sounds that will be played non-continuously, but constantly, use this so
# that pyglet decodes the sound in memory first, incurring less of a CPU penalty
sound = pyglet.resource.media('', streaming=False)
sound.play()